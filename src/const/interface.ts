export type Mode = 'mobile' | 'desktop';
export type AppMode = 'mobile' | 'desktop';

export interface RouterInterface {
  path?: string;
  needAuthor?: boolean;
  grantPermision?: Array<any>;
  component?: any & {
    desktop?: any & {
      page?: any;
      layout?: any;
    };
    mobile?: any & {
      page?: any;
      layout?: any;
    };
  };
  layout?: any;
}
