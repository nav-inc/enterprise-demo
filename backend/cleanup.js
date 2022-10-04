function setupCleanupHelpers() {
  const exitSignalsMap = {
    SIGTERM: () => exitHandler(0, 'SIGTERM'), // kubernetes
    SIGINT: () => exitHandler(0, 'SIGINT'), // Ctrl+c
    SIGUSR2: () => exitHandler(null, 'SIGUSR2', true), // For development - nodemon restarts
    uncaughtException: (err) => {
      console.info('Uncaught Exception', 'err:', err)
      return exitHandler(1, 'Unexpected Error')
    },
    unhandledRejection: (promise, reason) => {
      console.info('Unhandled Rejection at:', promise, 'reason:', reason)
      return exitHandler(1, 'Unhandled Promise')
    },
  }

  // Listen for exit signals
  Object.entries(exitSignalsMap).forEach(([key, handler]) => {
    process.on(key, handler)
  })

  function exitHandler(code, signal, shouldKillProcess = false) {
    console.info(`Recieved signal - ${signal}`)

    // Cleanup listeners - if we get here we know we are going to be exiting the process
    // so we don't need to listen for them anymore
    Object.entries(exitSignalsMap).forEach(([key, handler]) => {
      process.removeListener(key, handler)
    })

    // For development - nodemon restarts - https://github.com/remy/nodemon#controlling-shutdown-of-your-script
    if (shouldKillProcess) {
      process.kill(process.pid, signal)
    } else {
      process.exit(code)
    }
  }
}

module.exports = setupCleanupHelpers
