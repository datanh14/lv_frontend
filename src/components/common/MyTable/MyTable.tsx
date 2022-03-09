import { FunctionComponent } from "react";
import "./MyTable.scss";
import { Form, Input, Button, Table, Tag, Space, TableProps } from "antd";
import { ColumnType } from "antd/lib/table";

interface MyTableProps extends TableProps<any> {}
const MyTable: FunctionComponent<MyTableProps> = (props) => {
  const { dataSource = [], columns = [], scroll, pagination } = props;
  const { total = 0 } = pagination || {};
  let scrollX = 0;
  const convertColumn: any = columns?.map((col: ColumnType<any>) => {
    const { dataIndex, key, width = 100 } = col;
    scrollX += Number(width);
    return { ...col, key: key || dataIndex, width };
  });
  return (
    <Table
      className="my-table"
      {...props}
      pagination={total > 10 ? pagination || undefined : false}
      columns={convertColumn}
      scroll={{ ...scroll, x: scrollX }}
    />
  );
};

export default MyTable;
