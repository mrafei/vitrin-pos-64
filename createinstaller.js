const createWindowsInstaller = require('electron-winstaller').createWindowsInstaller
const path = require('path')

getInstallerConfig()
  .then(createWindowsInstaller)
  .catch((error) => {
    console.error(error.message || error)
    process.exit(1)
  })

function getInstallerConfig() {
  console.log('creating windows installer')
  const rootPath = path.join('./')
  const outPath = path.join(rootPath, 'build')

  return Promise.resolve({
    // appDirectory: path.join(outPath, 'vitrin-pos-win32-x64/'),
    appDirectory: path.join(outPath, 'vitrin-pos-win32-ia32/'),
    authors: 'mrafei',
    noMsi: true,
    outputDirectory: path.join(outPath, 'installable'),
    exe: 'vitrin-pos.exe',
    setupExe: 'VitrinPOS-32bit.exe',
    setupIcon: path.join(rootPath, 'assets', 'icon.ico'),
    skipUpdateIcon: true,
    loadingGif: path.join(rootPath, 'assets', 'loading.gif'),
  })
}
