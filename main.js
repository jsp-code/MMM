// Modules to control application life and create native browser window
const { app, BrowserWindow } = require('electron');
const { ipcMain } = require('electron');
const path = require('path');
const { dialog } = require('electron');
const fs = require('fs');
//------------------------------------------------------------------------------
const filtros = { filters: [{ name: 'mapamental', extensions: ['mmm'] }] };
// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({
            width: 800,
            height: 600,
            icon: __dirname + '/app/imagens/app/mmm.png',
            webPreferences: {
                preload: path.join(__dirname, 'preload.js'),
                //permite o funcionamento do node dentro dos arquivos html
                nodeIntegration: true,
                enableRemoteModule: true

            }
        })
    mainWindow.maximize()
    //limpar cache

    mainWindow.webContents.session.clearStorageData();
    mainWindow.webContents.clearHistory()

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    // Emitted when the window is closed.
    mainWindow.on('closed', function() {
        // Dereference the window object, usually you would store windows
        // in an array if your app supports multi windows, this is the time
        // when you should delete the corresponding element.
        mainWindow = null
    })
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function() {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()
})
app.on('browser-window-created', function(e, window) {
   window.setMenu(null);
});
app.on('activate', function() {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) createWindow()

})

ipcMain.on('salve', (event, arg) => {
    dialog.showSaveDialog(mainWindow, filtros, {
        properties: ['openFile', 'openDirectory']
    }).then(result => {
        re = result.filePath.replace('.mmm','');
        fs.writeFile(re+'.mmm', arg, function(err) {
            if (err === undefined) {
                console.log('salvo com sucesso!')
            } else {
                console.log('arquivos não salvo')
            }
        })
        event.reply('file_endereco',result.filePath+'.mmm');
    }).catch(err => {
        console.log(err)
    })
});
ipcMain.on('salve_fast', (event,nome,arquivo) => {
    fs.writeFile( nome, arquivo, function(err) {
        if (err === undefined) {
            console.log('salvo com sucesso!');
        } else {
            console.log('arquivos não salvo');
        }
    })
});
ipcMain.on('load_file', (event,arg) => {
    dialog.showOpenDialog(mainWindow, filtros, {
        properties: ['openFile', 'openDirectory']
    }).then(result => {
          console.log(result)
          event.reply('fileData',result.filePaths[0]);
          event.reply('file_endereco',result.filePaths[0]);
    }).catch(err => {
        console.log(err)
    })
})