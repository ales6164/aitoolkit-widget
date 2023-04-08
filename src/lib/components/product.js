import React from "react";
import {formatMoney} from "../helpers";

export default function Product({products, item}) {
    if (!products) return null
    if (!item?.params?.[0]) return null
    const params = item.params[0].split(",")
    return (
        <div className="overflow-x-auto max-w-[100%]">
            <div className="my-2 flex gap-x-4 gap-y-4">
                {params.map((item, index) => {
                    const product = products.find((p) => ("" + p.id) === ("" + item).trim())
                    if (!product) return null
                    return <div
                        key={product.id}
                        className="min-w-[200px] max-w-[200px] group relative flex flex-col overflow-hidden rounded-lg bg-white dark:bg-gray-700"
                    >
                        <div
                            className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 sm:h-48">
                            <img
                                src={product.thumb}
                                alt={product.h}
                                className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                            />
                        </div>
                        <div className="flex flex-1 flex-col space-y-2 p-4">
                            <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                                <a href="#">
                                    <span aria-hidden="true" className="absolute inset-0"/>
                                    {product.h}
                                </a>
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-300">{product.desc}</p>
                            <div className="flex flex-1 flex-col justify-end">
                                <p className="text-sm italic text-gray-500 dark:text-gray-400">{product.brand}</p>
                                <p className="text-base font-medium text-gray-900 dark:text-gray-300">{formatMoney(product.price)} €</p>
                            </div>
                        </div>
                    </div>
                })}

            </div>
        </div>
    )
}
