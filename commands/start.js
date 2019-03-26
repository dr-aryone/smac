"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const chalk_1 = __importDefault(require("chalk"));
const ghetto_monad_1 = require("ghetto-monad");
const docker = __importStar(require("../lib/docker"));
const server_1 = require("../lib/server");
const exit_1 = require("../lib/util/exit");
const name_1 = require("../lib/util/name");
const logs_1 = require("./logs");
const status_1 = require("./status");
const stop_1 = require("./stop");
function startServer() {
    return __awaiter(this, void 0, void 0, function* () {
        const name = yield name_1.getTargetForCommand({ includeRunningContainer: false });
        if (name.isNothing) {
            console.log('No name provided, and no package.json with a server name found.');
            return exit_1.exit();
        }
        // @TODO
        // installJSPluginsIfNeeded()
        // installJavaPluginsIfNeeded()
        const data = yield status_1.getContainerStatus(name.value);
        if (!data.isError) {
            if (data.value.Status === 'running') {
                console.log(`${name.value} is already running.`);
                return exit_1.exit();
            }
            if (data.value.Status === 'created') {
                console.log(`${name.value} has been created, but is not running. Trying waiting, or stopping it.`);
                console.log(`If that doesn't work - check if this issue has been reported at https://github.com/Magikcraft/scriptcraft-sma/issues`);
                return exit_1.exit();
            }
            if (data.value.Status === 'exited') {
                return stop_1.removeStoppedInstance(name.value);
            }
            if (data.value.Status === 'paused') {
                yield restartPausedContainer(name.value);
                yield status_1.getStatus();
                exit_1.exit();
            }
        }
        console.log(`Starting ${name.value}`);
        const result = yield startNewInstance(name.value);
        if (!result.isError) {
            logs_1.viewLogs();
        }
    });
}
exports.startServer = startServer;
function restartPausedContainer(name) {
    console.log(`Unpausing ${name}`);
    return docker.command(`unpause ${name}`);
}
function startNewInstance(name) {
    return __awaiter(this, void 0, void 0, function* () {
        const tag = yield server_1.server.getDockerTag();
        const port = yield server_1.server.getPort();
        const bind = yield server_1.server.getBindings(name);
        const env = yield server_1.server.getEnvironment();
        const rest = yield server_1.server.getRestConfig();
        const cache = `--mount source=sma-server-cache,target=/server/cache`;
        try {
            const dc = `run -d -p ${port}:25565 -p ${rest.port}:${rest.port} --name ${name} ${env} ${bind} ${cache} --restart always magikcraft/scriptcraft:${tag}`;
            yield docker.command(dc);
            console.log(chalk_1.default.yellow(`Server ${name} started on localhost:${port}\n`));
            console.log('Start command:');
            console.log(dc.split('--').join('\n\t--'));
            return new ghetto_monad_1.Result(true);
        }
        catch (e) {
            console.log('There was an error starting the server!');
            console.log(e
                .toString()
                .split('--')
                .join('\n\t--'));
            console.log(`\nTry stopping the server, then starting it again.\n\nIf that doesn't work - check if this issue has been reported at https://github.com/Magikcraft/scriptcraft-sma/issues`);
            return new ghetto_monad_1.ErrorResult(new Error());
        }
    });
}