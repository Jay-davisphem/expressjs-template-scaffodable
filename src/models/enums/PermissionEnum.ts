enum PermissionEnum {
  CREATE_COURSE = 'CREATE_COURSE',
  EDIT_COURSE = 'EDIT_COURSE',
  DELETE_COURSE = 'DELETE_COURSE',
  VIEW_COURSE = 'VIEW_COURSE',
  ENROLL_COURSE = 'ENROLL_COURSE',
  VIEW_VIDEO = 'VIEW_VIDEO',
  UPLOAD_VIDEO = 'UPLOAD_VIDEO',
  COMMENT = 'COMMENT',
  MODERATE_COMMENT = 'MODERATE_COMMENT',
  MANAGE_USERS = 'MANAGE_USERS',
  MANAGE_ROLES = 'MANAGE_ROLES',
  MANAGE_CONTENT = 'MANAGE_CONTENT',
  MANAGE_DISCUSSIONS = 'MANAGE_DISCUSSIONS',
  VIEW_ANALYTICS = 'VIEW_ANALYTICS',
  CONFIGURE_SYSTEM = 'CONFIGURE_SYSTEM',
  APPROVE_REQUESTS = 'APPROVE_REQUESTS',
}



  namespace PermissionEnum {
    export function getNormalUserDefault(): PermissionEnum[] {
      return [
        PermissionEnum.VIEW_COURSE,
        PermissionEnum.ENROLL_COURSE,
        PermissionEnum.VIEW_VIDEO,
        PermissionEnum.COMMENT,
      ];
    }
  }
  
  export default PermissionEnum;