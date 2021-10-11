import React, { useState } from 'react'
import { Popover, Button, Col, Menu, Input, InputNumber, Radio, Row, Space, Tooltip } from "antd"
import { AppstoreOutlined } from '@ant-design/icons'
import ReactDataSheet from 'react-datasheet'
import "react-datasheet/lib/react-datasheet.css";
import "@/pages/custom.css";

import CSVChart2 from "@/components/dcvs"
import styles from "@/pages/index.less"

export interface GridElement extends ReactDataSheet.Cell<GridElement, number> {
  value: number | null;
}

class MyReactDataSheet extends ReactDataSheet<GridElement, number> { }

interface AppState {
  grid: GridElement[][];
}

//You can also strongly type all the Components or SFCs that you pass into ReactDataSheet.
let cellRenderer: ReactDataSheet.CellRenderer<GridElement, number> = (props) => {
  const backgroundStyle = props.cell.value && props.cell.value < 0 ? { color: 'red' } : undefined;
  return (
    <td style={backgroundStyle} onMouseDown={props.onMouseDown} onMouseOver={props.onMouseOver} onDoubleClick={props.onDoubleClick} className="cell">
      {props.children}
    </td>
  )
}
const CsvForm: React.FC = ({
  initValue,
  onChange,
}) => {
  const grid = initValue.data
  const chartType = initValue.chartType
  const title = initValue.title
  const valueRenderer = cell => cell.value;
  const onCellsChanged = changes => {
    const cgrid = grid.map(row => [...row])
    changes.forEach(({ cell, row, col, value }) => {
      cgrid[row][col] = { ...grid[row][col], value }
    })
    onChange({
      chartType: chartType,
      title: title,
      data: cgrid
    })
  };
  const onContextMenu = (e, cell, i, j) => cell.readOnly ? e.preventDefault() : null;
  const setChartType = e => {
    onChange({
      title: title,
      chartType: e.target.value,
      data: grid
    })
  }
  const setTitle = (e) => {
    onChange({
      chartType: chartType,
      title: e.target.value,
      data: grid
    })
  }
  const [x, setX] = React.useState(grid.length);
  const [y, setY] = React.useState(grid[0].length);
  const [popVisible, setPopVisible] = React.useState(false);
  const hide = () => {
    setPopVisible(false)
  }
  const confirmXY = () => {
    const newData = []
    for (let i = 0; i < x; i++) {
      const row = Array(y).fill({ value: '' }, 0, y)
      const originRow = grid[i]
      if (originRow) {
        for (let j = 0; j < y && j < originRow.length; j++) {
          row[j] = originRow[j]
        }
      }
      newData.push(row)
    }
    onChange({
      chartType: chartType,
      title: title,
      data: newData
    })
    hide()
  }

  const menu = (
    <Menu>
      <Menu.Item>
        <Space>
          <InputNumber value={x} onChange={v => setX(v)}></InputNumber>
          <span>x</span>
          <InputNumber value={y} onChange={v => setY(v)}></InputNumber>
          <Button type="primary" onClick={confirmXY}>确定</Button>
        </Space>
      </Menu.Item>
    </Menu>
  );


  return (
    <div>
      <CSVChart2 type={chartType} data={grid} title={title} />
      <Row className={styles.gap}>
        <Col span={2} className={styles.right}>
          <label>标题</label>
        </Col>
        <Col span={22}>
          <Input name="title" onChange={setTitle} value={title}></Input>
        </Col>
      </Row>
      <Row className={styles.gap}>
        <Col span={2} className={styles.right}>
          <label>图表类型</label>
        </Col>
        <Col span={22}>
          <Radio.Group onChange={setChartType} value={chartType}>
            <Radio value={'line'}>折线图</Radio>
            <Radio value={'bar'}>柱状图</Radio>
            <Radio value={'stack'}>堆积图</Radio>
          </Radio.Group>
        </Col>
      </Row>
      <Tooltip placement="topLeft" title='调整表格'>
        <Popover
          content={menu}
          title="调整表格"
          trigger="click"
          visible={popVisible}
          onVisibleChange={setPopVisible}
          placement="bottomRight"
        >
          <AppstoreOutlined className={styles.editableIcon} onClick={() => console.log("abcdef")} />
        </Popover>
      </Tooltip>
      <div>
      </div>
      <MyReactDataSheet
        data={grid}
        valueRenderer={valueRenderer}
        onCellsChanged={onCellsChanged}
      />
    </div>
  );
};

export default CsvForm