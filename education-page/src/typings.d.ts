declare var require: {
    (path: string): any;
    context: (directory: string, useSubdirectories?: boolean, regExp?: RegExp) => {
      keys: () => string[];
      (id: string): any;
    };
  };
  