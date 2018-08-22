// Importing modules.
const electron = require('electron');
require('./server');
// const url = require('url');
// const path = require('path');

// Creating menu bottoms.
const mainMenuTemplate = [
	{
		label: 'Menu',
		submenu: [
			{
				label: 'Quit',
				accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
				click(){
					app.quit();
				}
			},
			{
				label: 'Tools',
				click(){
					openDevTools();
				}
			}
		]
	}
];

// Creating electron instance.
const {app, Menu, BrowserWindow} = electron;
let mainWindow;

app.on('ready', function(){
	mainWindow = new BrowserWindow({
		width: 1200,
		height: 900,
		darkTheme: true,
		title: 'Template'
	});
	
	const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
	Menu.setApplicationMenu(mainMenu);

	mainWindow.loadURL('http://localhost:3000/home');

	mainWindow.on('closed', function(){
		app.quit()
	});
});