

export type TOptionQuery<T> ={
    sort?:keyof T
    pagination?:TPagination

}

type TPagination  ={
    offset:number,
    limit:number
}

