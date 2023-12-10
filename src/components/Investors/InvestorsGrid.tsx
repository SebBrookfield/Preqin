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
import { investorsService } from '../../services/prequinInvestorsService'
import { Investor } from '../../services'

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
  showInvestorPanelForId: (investorId: number) => void
}

const columns: string[] = [
  'firmID',
  'firmName',
  'region',
  'address',
  'city',
  'stateCounty',
  'zipCode',
  'country',
  'website',
  'email',
  'tel',
  'fax',
  'generalConsultant',
  'localLanguageFirmName',
  'secondaryLocations',
  'firmType',
  'yearEst',
  'investorCurrency',
  'matchingFunds',
  'about'
]

export const InvestorsGrid: FC<GridProps> = ({
  filter,
  showInvestorPanelForId,
  overlayNoRowsTemplate,
  overlayLoadingTemplate,
  modules,
  defaultColDef,
  ...rest
}) => {
  const [investors, setInvestors] = useState<Investor[]>()
  const [loading, setLoading] = useState<boolean>(true)

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

  return (
    <StyledBox className={'ag-theme-material'}>
      <AgGridReact
        rowData={loading && !investors ? undefined : investors || []}
        columnDefs={columns.map(c => ({
          field: c
        }))}
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
