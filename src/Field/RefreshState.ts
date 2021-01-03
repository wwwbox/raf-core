export function refreshState(current: any, passed: any, initial: any) {
    let somethingChanged = false;
    const passedKeys = Object.keys(passed);
    for (let key of passedKeys) {
        if (passed[key] !== initial[key]) {
            if (typeof passed[key] === "function" || typeof current[key] === "undefined") {
                continue;
            }
            if (typeof passed[key] === "object" && typeof current[key] === "object") {
                if (JSON.stringify(passed[key]) === JSON.stringify(current[key])) {
                    continue;
                }
            }
            current[key] = passed[key];
            somethingChanged = true;
        }
    }
    
    return somethingChanged;
}