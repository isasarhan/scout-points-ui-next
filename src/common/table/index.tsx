import React, { FC } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export interface Column {
    label: string;
    value: any;
    render?: (value: any, row?: any) => React.ReactNode;
}

export interface TablePropsComp {
    caption?: string
    column: Column[]
    data: any[]
}
const TableComp: FC<TablePropsComp> = ({ data, column, caption }) => {
    return (
        <Table>
            {caption && <TableCaption>{caption}</TableCaption>}
            <TableHeader>
                <TableRow>
                    {column.map((col, index) => (
                        <TableHead key={`table-header-${index}`}>{col.label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((v, index) => (
                        <TableRow className='p-4' key={`table-index-${index}`}>
                            {column.map((col, colIndx) => (
                                <TableCell className='p-5' key={`table-col-index-${colIndx}`}>{col.render ? col.render(v[col.value]) : v[col.value]}</TableCell>
                            ))}
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    );
};

export default TableComp;