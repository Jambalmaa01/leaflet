'use client ';

import {trpc} from '@/lib/trpc/trpc';
import { 
    AuthSignInSchema, 
    authSignInSchema, 
    authSignInSchemaDefaultValues 
} from '@/lib/zod';
import { Controller, useForm } from 'react-hook-form';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Grid2, TextField, Typography } from '@mui/material';
import { SnackbarKey, useSnackbar } from 'notistack';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingButton } from '@mui/lab';

export function AuthSignInScreen(){
    const router=useRouter()
    const {enqueueSnackbar, closeSnackbar} =useSnackbar()
    const [snackbarId, setSnackBarId] =useState<SnackbarKey | null>(null)
    const {handleSubmit, control, reset, formState } =useForm<AuthSignInSchema>({
        resolver:zodResolver(authSignInSchema),
        defaultValues:authSignInSchemaDefaultValues,
    })
    const {mutate, isLoading } =trpc.authSignInMutation.useMutation({
        onSuccess(data){
            reset();
            router.push(`/app/test`);
            enqueueSnackbar(`sainuu ${data.user.username}`,{
                variant:'success'
            })
        },
        onError(error){
            enqueueSnackbar(error.message, {variant:'error'})
        },
        onSettled(){
            if(snackbarId){
                setSnackBarId(null)
                closeSnackbar(snackbarId)
            }
        }
    })

    function onSubmit(data:AuthSignInSchema){
        const snackbarId = enqueueSnackbar(`Нэвтэрч байна`, {
            variant: 'warning',
          });
        setSnackBarId(snackbarId);
        console.log('data',data)
        mutate(data);
    }
    
    return(
        <Grid2 
            container 
            component={'form'}
            onSubmit={handleSubmit(onSubmit)}
            spacing={2}
        >
        <Grid2 size={12}>
           <Typography variant='button' color ='primary.main'>
            Newtreh
           </Typography>
        </Grid2>
        <Grid2 size={12}>
           <Controller
             control={control}
             name='username'
             render={({field, fieldState})=>(
                <TextField
                  label='newtreh ner'
                  {...field}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                />
             )}
           />
        </Grid2>
        <Grid2 size={12}>
            <Controller
              control={control}
              name='password'
              render={({field, fieldState})=>(
                <TextField
                  label={'nuuts vg'}
                  type='password'
                  {...field}
                  error={!!fieldState.error?.message}
                  helperText={fieldState.error?.message}
                />
              )}
            />
        </Grid2>
        <Grid2 size={12}>
        <LoadingButton loading={isLoading} type='submit'>Нэвтрэх</LoadingButton>
      </Grid2>

    </Grid2>
    )
}







