@echo off
setlocal
cd /d "%~dp0"

where node.exe >nul 2>&1
if errorlevel 1 (
  echo No se encontro Node.js. Instale una version compatible indicada en el README.
  pause
  exit /b 1
)

where pnpm.cmd >nul 2>&1
if errorlevel 1 (
  echo No se encontro pnpm. Siga los requisitos del README.
  pause
  exit /b 1
)

echo Comprobando e instalando las dependencias del proyecto React...
call pnpm install --frozen-lockfile
if errorlevel 1 (
  echo No se pudieron instalar las dependencias. Revise la conexion y la version de Node.js.
  pause
  exit /b 1
)

echo.
echo EXPLORER APP CON REACT
echo Abra en su navegador la direccion Local que mostrara Vite.
echo Mantenga esta ventana abierta. Para detener la aplicacion, presione Ctrl+C.
echo.
call pnpm run dev
if errorlevel 1 (
  echo La aplicacion no pudo iniciarse. Revise el mensaje anterior.
  pause
  exit /b 1
)
