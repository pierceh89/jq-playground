declare module "jq-web" {
  interface JQ {
    json(data: any, filter: string): any;
    raw(jsonString: string, filter: string): string;
    onInitialized: {
      addListener(callback: () => void): void;
    };
    promised: {
      json(data: any, filter: string): Promise<any>;
      raw(jsonString: string, filter: string): Promise<string>;
    };
  }

  const jq: JQ;
  export default jq;
  export = jq;
}
