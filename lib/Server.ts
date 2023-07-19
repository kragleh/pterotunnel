export interface Server {
  server_owner: boolean;
  identifier: string;
  uuid: string;
  name: string;
  node: string;
  sftp_details: {
    ip: string;
    port: number;
  };
  description: string;
  limits: {
    memory: number;
    swap: number;
    disk: number;
    io: number;
    cpu: number;
  };
  feature_limits: {
    databases: number;
    allocations: number;
    backups: number;
  };
  is_suspended: boolean;
  is_installing: boolean;
  relationships: {
    allocations: {
      data: [
        {
          attributes: {
            id: number;
            ip: string;
            port: number;
            is_default: boolean;
          }
        }
      ]
    }
  }
}