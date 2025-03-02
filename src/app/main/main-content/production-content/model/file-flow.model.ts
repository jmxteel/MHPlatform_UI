import { FileFlowArea } from "./file-flow-area.model";

export interface FileFlow {
    id: number;
    orderID: string | null;
    fileFlowNo: number;
    dateCreated?: string;
    oTfactor?: string;
    oTchkbx?: string;
    priority?: string;
    apprxDelDate?: Date;
    projectList?: string;
    apprDelDateTxt?: string;
    paymentReceived?: Date;
    fileMadeUp?: Date;
    designConsultant?: string;
    technicalRep?: string;
    fileIn?: Date;
    cmDate?: Date;
    targetDate?: Date;
    fileOut?: Date;
    overTargetDate?: Date;
    reasons?: string;
    leadStart?: Date;
    leadClosed?: Date;
    revision?: string;
    chckdDocsDate?: Date;
    chckdForTechnclDate?: Date;
    approvedDate?: Date;
    leftShwroom?: Date;
    recvinPlant?: Date;
    shwrm?: string;
    deleted?: string;
    deletedBy?: string;
    grpngSysGen?: string;
    grpngCtgry?: string;
    grpngMat?: string;
    manualGrpngCtgry?: string;
    manualGrpngMat?: string;
    chckbySalesDesigner?: Date;
    variation?: string;
    workingDaysOver?: string;
    workingDaysUnder?: string;
    fFsrc?: string;
    fGrouping?: string;
    mGrouping?: string;
    sysVer?: string;
    typ?: string;
    cbfpaging?: string;
    fpaging?: string;
    isLock?: string;
    lockedBy?: string;
    mHGrouping?: string;
    sampleColor?: string;
  
    // Collection of Areas
    areas: FileFlowArea[];
  }