export type EventHandler = (...args: any[]) => any;
export default class EventEmitter {
  private events = new Map<string, EventHandler[]>();

  on(event: string, fn: EventHandler) {
    this.events.set(event, (this.events.get(event) || []).concat(fn));
  }

  emit(event: string, ...args: any[]) {
    const handlers = this.events.get(event);
    if (handlers) {
      handlers.forEach(handler => handler(...args));
    }
  }

  off(event: string, handler: EventHandler) {
    const handlers = this.events.get(event);
    if (handlers) {
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }
}
