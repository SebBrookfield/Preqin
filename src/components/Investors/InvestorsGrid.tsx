import React, { FC, useEffect, useState } from 'react'
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
import { investorsService } from '../../services/preqinInvestorsService'
import { Investor } from '../../services'
import { useNavigate } from 'react-router-dom'

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

type GridProps<TData = any> = Exclude<
  AgGridReactProps<TData> | AgReactUiProps<TData>,
  'rowData'
> & {
  filter: { firmIds: number[] }
}

const columns: string[] = [
  'firmID',
  'firmName',
  'firmType',
  'address',
  'dateAdded'
]

export const InvestorsGrid: FC<GridProps> = ({
  filter,
  overlayNoRowsTemplate,
  overlayLoadingTemplate,
  modules,
  defaultColDef,
  ...rest
}) => {
  const [investors, setInvestors] = useState<Investor[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (filter?.firmIds) {
      investorsService
        .getInvestorsByFirmId(filter.firmIds?.map(id => id.toString()))
        .then(investors => {
          setInvestors(investors)
          setLoading(false)
        })
    }
  }, [])

  const navigateToInvestor = (investor: Investor) => {
    navigate(`/investors/${parseInt(investor.firmID)}`, {
      state: {
        investor
      }
    })
  }

  return (
    <StyledBox className={'ag-theme-material'}>
      <AgGridReact
        columnDefs={columns.map(c => ({
          field: c
        }))}
        rowData={loading && !investors ? undefined : investors || []}
        getRowId={params => params.data.firmID}
        onRowClicked={event => navigateToInvestor(event.data)}
        defaultColDef={{
          ...baseColDef,
          ...(defaultColDef ?? {})
        }}
        modules={[...baseModules, ...(modules || [])]}
        overlayNoRowsTemplate={
          overlayNoRowsTemplate ||
          renderToString(
            <Box height={'auto'}>
              <Typography>No investors to display</Typography>
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
