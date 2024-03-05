export type APIResponse<D> =
  | {
      success: true;
      data: D;
    }
  | {
      success: false;
      error: string;
    };
