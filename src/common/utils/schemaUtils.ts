export const generateToJSONMethod = (schema: any) => {
    schema.methods.toJSON = function() {
      const obj = this?.toObject?.();
      if (obj) {
        delete obj.password;
        delete obj._id;
      }
      return obj;
    };
  };