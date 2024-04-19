export function Loggable(logRequest: boolean = false, logResponse: boolean = true, ...logArgs: any[]) {
    return function(target: Function, context: any) {
        console.log('CONTEXT', context)
        if (context.kind === "method") {
            return function (...args: any[]) {
                console.log(`args ${args}\nlogArgs ${logArgs}`)
                var logStr = new Date().toISOString().concat(" - ").concat(target.name)
                if(logRequest) {
                    logStr = logStr.concat(" - Request: ").concat(...args)
                }

                // @ts-ignore
                var response = target.apply(this, args)
                
                if(logResponse){
                    logStr = logStr.concat(" - Response: ").concat(JSON.stringify(response))
                }

                if(logArgs.length){
                    logStr = logStr.concat(" - Addional Info: ").concat(logArgs.join(" "))
                }
                
                console.log(logStr)
                return response
            }
        }
    }
  }