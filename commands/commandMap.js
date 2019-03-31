"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.commandMap = {
    start: {
        description: 'Start a server',
        name: 'start',
        startDefinitions: [
            {
                name: 'test',
                alias: 't',
                type: Boolean,
            },
            {
                name: 'profile',
                alias: 'p',
                type: String,
            },
        ],
    },
    stop: {
        description: 'Stop a server',
        name: 'stop',
    },
    status: {
        description: 'Get the status of a server',
        name: 'status',
    },
    list: {
        description: 'List running SMA servers',
        name: 'list',
    },
    info: {
        description: 'Inspect a running server',
        name: 'info',
    },
    logs: {
        description: 'View logs for a server',
        name: 'logs',
    },
    restart: {
        description: 'Restart the server',
        name: 'restart',
    },
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbWFuZE1hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbW1hbmRNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBYSxRQUFBLFVBQVUsR0FBRztJQUN0QixLQUFLLEVBQUU7UUFDSCxXQUFXLEVBQUUsZ0JBQWdCO1FBQzdCLElBQUksRUFBRSxPQUFPO1FBQ2IsZ0JBQWdCLEVBQUU7WUFDZDtnQkFDSSxJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsR0FBRztnQkFDVixJQUFJLEVBQUUsT0FBTzthQUNoQjtZQUNEO2dCQUNJLElBQUksRUFBRSxTQUFTO2dCQUNmLEtBQUssRUFBRSxHQUFHO2dCQUNWLElBQUksRUFBRSxNQUFNO2FBQ2Y7U0FDSjtLQUNKO0lBRUQsSUFBSSxFQUFFO1FBQ0YsV0FBVyxFQUFFLGVBQWU7UUFDNUIsSUFBSSxFQUFFLE1BQU07S0FDZjtJQUVELE1BQU0sRUFBRTtRQUNKLFdBQVcsRUFBRSw0QkFBNEI7UUFDekMsSUFBSSxFQUFFLFFBQVE7S0FDakI7SUFDRCxJQUFJLEVBQUU7UUFDRixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDRixXQUFXLEVBQUUsMEJBQTBCO1FBQ3ZDLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxJQUFJLEVBQUU7UUFDRixXQUFXLEVBQUUsd0JBQXdCO1FBQ3JDLElBQUksRUFBRSxNQUFNO0tBQ2Y7SUFDRCxPQUFPLEVBQUU7UUFDTCxXQUFXLEVBQUUsb0JBQW9CO1FBQ2pDLElBQUksRUFBRSxTQUFTO0tBQ2xCO0NBQ0osQ0FBQSJ9