import React, { FC } from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

export interface Column {
    label: string;
    value: any;
    render?: (value: any, row?: any) => React.ReactNode;
}

export interface TablePropsComp {
    column: Column[];
    data: any[]
}
const TableComp: FC<TablePropsComp> = ({ data, column }) => {
    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    {column.map((col) => (
                        <TableHead>{col.label}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {
                    data.map((v) => (
                        <TableRow>
                            {column.map((col) => (
                                <TableCell>{col.render ? col.render(v[col.value]) : v[col.value]}</TableCell>
                            ))}
                        </TableRow>
                    ))
                }
            </TableBody>
        </Table>

    );
};

export default TableComp;