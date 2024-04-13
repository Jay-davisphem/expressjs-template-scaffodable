"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PermissionEnum;
(function (PermissionEnum) {
    PermissionEnum["CREATE_COURSE"] = "CREATE_COURSE";
    PermissionEnum["EDIT_COURSE"] = "EDIT_COURSE";
    PermissionEnum["DELETE_COURSE"] = "DELETE_COURSE";
    PermissionEnum["VIEW_COURSE"] = "VIEW_COURSE";
    PermissionEnum["ENROLL_COURSE"] = "ENROLL_COURSE";
    PermissionEnum["VIEW_VIDEO"] = "VIEW_VIDEO";
    PermissionEnum["UPLOAD_VIDEO"] = "UPLOAD_VIDEO";
    PermissionEnum["COMMENT"] = "COMMENT";
    PermissionEnum["MODERATE_COMMENT"] = "MODERATE_COMMENT";
    PermissionEnum["MANAGE_USERS"] = "MANAGE_USERS";
    PermissionEnum["MANAGE_ROLES"] = "MANAGE_ROLES";
    PermissionEnum["MANAGE_CONTENT"] = "MANAGE_CONTENT";
    PermissionEnum["MANAGE_DISCUSSIONS"] = "MANAGE_DISCUSSIONS";
    PermissionEnum["VIEW_ANALYTICS"] = "VIEW_ANALYTICS";
    PermissionEnum["CONFIGURE_SYSTEM"] = "CONFIGURE_SYSTEM";
    PermissionEnum["APPROVE_REQUESTS"] = "APPROVE_REQUESTS";
})(PermissionEnum || (PermissionEnum = {}));
(function (PermissionEnum) {
    function getNormalUserDefault() {
        return [
            PermissionEnum.VIEW_COURSE,
            PermissionEnum.ENROLL_COURSE,
            PermissionEnum.VIEW_VIDEO,
            PermissionEnum.COMMENT,
        ];
    }
    PermissionEnum.getNormalUserDefault = getNormalUserDefault;
})(PermissionEnum || (PermissionEnum = {}));
exports.default = PermissionEnum;
