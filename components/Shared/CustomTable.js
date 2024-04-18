import React from "react";

export default function CustomTable({tableData = [], columns, actionOnEdit, actionOnDelete}) {
    return (
        <div className="overflow-x-auto bg-admin-secondary p-5">
            <table className="table table-zebra table-lg  rounded-none">
                <thead className='bg-admin-primary'>
                <tr className='border-0'>
                    <th>SL.</th>
                    {
                        columns.map((c, i) => <th key={i}>{c.name}</th>)
                    }
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {tableData.length !== 0 ?
                    tableData.map((td, i) => <tr className='border-0' key={i}>
                        <td>{i + 1}</td>
                        {
                            columns.map((c, i) => <td key={i}>{td[c.value]}</td>)
                        }
                        <td>
                            <button className='btn btn-sm text-lg text-warning btn-ghost'
                                    onClick={() => actionOnEdit(td)}><i
                                className='bi bi-pencil-square'></i>
                            </button>
                            <button className='btn btn-sm text-lg text-error btn-ghost'
                                    onClick={() => actionOnDelete(td)}><i className='bi bi-trash'></i>
                            </button>
                        </td>
                    </tr>) : <tr className='border-0'>
                        <td colSpan={columns.length + 2} className='text-center py-5'>No Data to Show</td>
                    </tr>
                }

                </tbody>
            </table>
        </div>
    );
}
