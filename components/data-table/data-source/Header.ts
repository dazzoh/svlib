/**
 * Definitions for the data grid row and column headers.
 *  - This is supplied when building the data source for the data grid.
 */
export interface IHeaderConfig {
  columnHeader: (IHeaderItemGroup | IHeaderItem)[];
  rowHeader: IHeaderItemGroup[] | IHeaderItem[];
}

/**
 * Column or row header item.
 */
export interface IHeaderItem {

  // a key which can identify the item (or group of items), it needs be unique.
  key?: string | number,
  //the display label.  key used if this is not set
  label?: string
  // store metadata
  metaData?: { [key: string]: any }
}

/**
 * group of column or row headers
 */
export interface IHeaderItemGroup extends IHeaderItem {
  items: IHeaderItemGroup[] | IHeaderItem[]
}

export function isHeaderItemGroupArray(item: IHeaderItem[] | IHeaderItemGroup[]): item is IHeaderItemGroup[] {
  return Array.isArray((item[0] as any)['items']);
}

export function isHeaderItemGroup(item: IHeaderItem | IHeaderItemGroup): item is IHeaderItemGroup {
  return Array.isArray((item as any)['items']);
}

export function genTestConfig(): IHeaderConfig {

  return {
    columnHeader: [
      {
        key: 'Col Group 0',
        items: [
          {
            key: 'Col Group 0.0', items: [
              { key: 'col 0' },
              { key: 'col 1' },
              { key: 'col 2' },
              { key: 'col 3' },
            ],
          },
          {
            key: 'Col Group 0.1', items: [
              { key: 'col 4' },
              { key: 'col 5' },
              { key: 'col 6' },
              { key: 'col 7' },
            ],
          },

        ],

      },
      {
        key: 'Col Group 1',
        items: [
          {
            key: 'Col Group 1.0', items: [
              { key: 'col 8' },
              { key: 'col 9' },
              { key: 'col 10' },
              { key: 'col 11' },
            ],
          }, {
            key: 'Col Group 1.1', items: [
              { key: 'col 12' },
              { key: 'col 13' },
              { key: 'col 14' },
              { key: 'col 15' },
            ],
          },

        ],
      },
      {
        key: 'Col Group 2',
        items: [
          {
            key: 'Col Group 2.0', items: [
              { key: 'col 16' },
              { key: 'col 17' },
              { key: 'col 18' },
              { key: 'col 19' },
            ],
          },
          {
            key: 'Col Group 2.1', items: [
              { key: 'col 20' },
              { key: 'col 21' },
              { key: 'col 22' },
              { key: 'col 23' },
            ],
          },

        ],
      },
      {
        key: 'Col Group 3',
        items: [
          {
            key: 'Col Group 3.0', items: [
              { key: 'col 24' },
              { key: 'col 25' },
              { key: 'col 26' },
              { key: 'col 27' },
            ],
          },
          {
            key: 'Col Group 3.1', items: [
              { key: 'col 28' },
              { key: 'col 29' },
              { key: 'col 30' },
              { key: 'col 31' },
            ],
          },

        ],
      },

    ],
    rowHeader: [
      {
        key: 'Row Group0',
        items: [
          {
            key: 'Row Group0.0', items: [
              { key: 'Row 0' },
              { key: 'Row 1' },
              { key: 'Row 2' },
              { key: 'Row 3' },
            ],
          },
          {
            key: 'Row Group0.1', items: [
              { key: 'Row 4' },
              { key: 'Row 5' },
              { key: 'Row 6' },
              { key: 'Row 7' },
            ],
          },

        ],

      }, {
        key: 'Row Group1',
        items: [
          {
            key: 'Row Group1.0', items: [
              { key: 'Row 8' },
              { key: 'Row 9' },
              { key: 'Row 10' },
              { key: 'Row 11' },
            ],
          }, {
            key: 'Row Group1.1', items: [
              { key: 'Row 12' },
              { key: 'Row 13' },
              { key: 'Row 14' },
              { key: 'Row 15' },
            ],
          },

        ],
      },

    ],
  };

}

