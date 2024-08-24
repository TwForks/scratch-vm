const BlockUtility = require('../engine/block-utility');

class CompatibilityLayerBlockUtility extends BlockUtility {
    constructor () {
        super();
        this._startedBranch = null;
    }

    get stackFrame () {
        return this.thread.compatibilityStackFrame;
    }

    startBranch (branchNumber, isLoop, onEnd) {
        this._branchInfo.onEnd.push(onEnd || (() => {}));
        this._startedBranch = [branchNumber, isLoop];
    }

    startBranchAsync (branchNumber, isLoop) {
        this._startedBranch = [branchNumber, isLoop];
        return new Promise((resolve) => {
            this._branchInfo.onEnd.push(resolve);
        });
    }

    startProcedure () {
        throw new Error('startProcedure is not supported by this BlockUtility');
    }

    // Parameters are not used by compiled scripts.
    initParams () {
        throw new Error('initParams is not supported by this BlockUtility');
    }
    pushParam () {
        throw new Error('pushParam is not supported by this BlockUtility');
    }
    getParam () {
        throw new Error('getParam is not supported by this BlockUtility');
    }

    init (thread, fakeBlockId, stackFrame, branchInfo) {
        this.thread = thread;
        this.sequencer = thread.target.runtime.sequencer;
        this._startedBranch = null;
        this._branchInfo = branchInfo;
        thread.stack[0] = fakeBlockId;
        thread.compatibilityStackFrame = stackFrame;
    }
}

// Export a single instance to be reused.
module.exports = new CompatibilityLayerBlockUtility();
