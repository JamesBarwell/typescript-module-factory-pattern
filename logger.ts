function LoggerInit() {
    return {
        info: function(args: any): void {
          console.log(...arguments);
        }
    }
};

export { LoggerInit };
export type Logger = ReturnType<typeof LoggerInit>;
