import React, { FC } from 'react'
import { ClientSideRowModelModule } from '@ag-grid-community/client-side-row-model'
import { ClipboardModule } from '@ag-grid-enterprise/clipboard'
import { ColumnsToolPanelModule } from '@ag-grid-enterprise/column-tool-panel'
import { MasterDetailModule } from '@ag-grid-enterprise/master-detail'
import { MenuModule } from '@ag-grid-enterprise/menu'
import { RangeSelectionModule } from '@ag-grid-enterprise/range-selection'
import { RowGroupingModule } from '@ag-grid-enterprise/row-grouping'
import { SetFilterModule } from '@ag-grid-enterprise/set-filter'
import { ColDef, Module } from '@ag-grid-community/core'
import {
  AgGridReact,
  AgGridReactProps,
  AgReactUiProps
} from '@ag-grid-community/react'
import styled from 'styled-components'
import { Box, Typography } from '@mui/material'

import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-material.css'
import { renderToString } from 'react-dom/server'
import { LoadingSpinner } from '../LoadingSpinner'

const StyledBox = styled(Box)`
  height: 100%;
  width: 100%;
`

const baseModules: Module[] = [
  MenuModule,
  ClientSideRowModelModule,
  ClipboardModule,
  ColumnsToolPanelModule,
  MasterDetailModule,
  RangeSelectionModule,
  RowGroupingModule,
  SetFilterModule
]

const baseColDef: ColDef = {
  menuTabs: ['generalMenuTab', 'filterMenuTab', 'columnsMenuTab'],
  filter: true,
  sortable: true,
  resizable: true
}

type GridProps<TData = any> = (
  | AgGridReactProps<TData>
  | AgReactUiProps<TData>
) & {
  loading: boolean
}

export const Grid: FC<GridProps> = ({
  loading,
  rowData,
  overlayNoRowsTemplate,
  overlayLoadingTemplate,
  modules,
  defaultColDef,
  ...rest
}) => {
  return (
    <StyledBox className={'ag-theme-material'}>
      <AgGridReact
        rowData={loading ? undefined : rowData}
        defaultColDef={{
          ...baseColDef,
          ...(defaultColDef ?? {})
        }}
        modules={[...baseModules, ...(modules || [])]}
        overlayNoRowsTemplate={
          overlayNoRowsTemplate ||
          renderToString(
            <Box height={'auto'}>
              <Typography>Nothing to display</Typography>
            </Box>
          )
        }
        overlayLoadingTemplate={
          overlayLoadingTemplate ||
          renderToString(
            <Box display={'flex'} height={'48px'} width={'48px'}>
              <LoadingSpinner />
            </Box>
          )
        }
        {...rest}
      ></AgGridReact>
    </StyledBox>
  )
}
