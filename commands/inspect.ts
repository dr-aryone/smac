import chalk from 'chalk'
import { Result } from 'ghetto-monad'
import { exit } from 'process'
import * as docker from '../lib/docker'
import { getTargetForCommand, hintRunningContainers } from '../lib/util/name'
import { getContainerStatus } from './status'

export async function inspectContainer(serverTarget) {
    const name = new Result(serverTarget) || (await getTargetForCommand())
    if (name.isNothing) {
        await hintRunningContainers()
        return exit()
    }
    const target = name.value
    const status = await getContainerStatus(target)
    if (status.isError) {
        console.log(status.error.message)
        return exit(0)
    }
    console.log(chalk.blue(`${target}:`))
    console.log(status.value)
    const data = await docker.command(`inspect ${target}`)
    // console.log(data.object[0].State)
    console.log(chalk.blue('Container Mounts:'))
    console.log(data.object[0].Mounts)
    console.log(chalk.blue('Network:'))
    console.log(data.object[0].NetworkSettings.Ports)
    exit()
}
