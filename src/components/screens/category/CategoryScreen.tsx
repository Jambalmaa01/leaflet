'use client';

import { CategoryAddSchema, categoryAddSchemaDefaultValues, categoryAddSchema } from "@/lib/zod/schemas/category/add.category";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Grid2, TextField, Typography } from "@mui/material";
import { control } from "leaflet";
import { Controller, useForm } from "react-hook-form";
import { SnackbarKey, useSnackbar } from "notistack";
import { useState } from "react";
import { trpc } from "@/lib/trpc/trpc";

export function CategoryAddForm(){
    const {enqueueSnackbar, closeSnackbar}= useSnackbar()
    const [snackbarId, setSnackBarId] = useState<SnackbarKey | null>(null)
    const {handleSubmit, control }=useForm<CategoryAddSchema>({
        resolver:zodResolver(categoryAddSchema),
        defaultValues:categoryAddSchemaDefaultValues,
    })

    const {mutate, isLoading}= trpc.categoryAddMutation.useMutation({
        onSuccess(data){
            // reset();
            enqueueSnackbar('nemegdsen',{
                variant:'success'
            })
        }
    })

    function onSubmit(data:CategoryAddSchema){
        const snackbarId = enqueueSnackbar('nemsen', {variant:'error'})
        setSnackBarId(snackbarId)
        mutate(data)
    }
    return(
        <Grid2
         container
         spacing={2}
         component={'form'}
         onSubmit={handleSubmit(onSubmit)}
        >
            <Grid2 size={12} textAlign={'center'}>
                <Typography variant="button">
                   Nemeh
                </Typography>
            </Grid2>
            <Grid2 size={12}>
                <Controller
                control={control}
                name="category"
                render={({field, fieldState})=>{
                    return(
                        <TextField
                          label='angillal'
                          error={!!fieldState.error?.message}
                          helperText={fieldState.error?.message}
                          {...field}
                        />

                    )
                }}
                />
            </Grid2>
            <Grid2>
                <Button type="submit">nemeh</Button>
            </Grid2>

        </Grid2>
    )
}