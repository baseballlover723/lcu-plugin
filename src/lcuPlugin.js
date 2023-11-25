export default class LCUPlugin {
  constructor() {
    if (new.target === LCUPlugin) {
      throw new TypeError("Abstract class LCUPlugin can't be instantiated.");
    }
    this.eventSubscriptions = {};
  }

  /**
   * You should override this function to do any setup and
   * subscribe to any events you want to listen to.
   * If you return a promise (use `createPromise`),
   * then it will wait until the promise resolves before subscribing to events.
   * @param clientData
   */
  onConnect(clientData) {
  }

  /**
   * You should override this function to do any clean up when the league client is closed.
   * If you return a promise (use `createPromise`),
   * then it will wait until the promise resolves before subscribing to events.
   */
  onClose() {
  }

  /**
   * Call this function to do any async stuff in onConnect or onClose.
   * @param handler
   * @returns {Promise<unknown>}
   */
  createPromise(handler) {
    return new Promise(handler.bind(this));
  }

  subscribeEvent(event, handler) {
    this.eventSubscriptions[event] = handler.bind(this);
  }

  unsubscribeEvent(event) {
    delete this.eventSubscriptions[event];
  }

  log(...args) {
    console.log(`[${this.constructor.name}]`, ...args);
  }

  error(...args) {
    console.error(`[${this.constructor.name}]`, ...args);
  }
}
