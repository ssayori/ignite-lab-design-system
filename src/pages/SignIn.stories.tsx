import { Meta, StoryObj } from '@storybook/react'
import React from 'react'
import { within, userEvent, waitFor } from '@storybook/testing-library'
import { expect } from '@storybook/jest'
import { SignIn } from './SignIn'
import { rest } from 'msw'

export default {
    title: 'Pages/Sign In',
    component: SignIn,
    args: {},
    argTypes: {},
    parameters: {
        msw: {
            handlers: [
                rest.post('/sessions', (req, res, ctx) => {
                    return res(ctx.json({
                        message: 'Login realizado!'
                    }))
                })
            ]
        }
    }
} as Meta

export const SignInTest: StoryObj = {
    play: async ({ canvasElement }) => {
        const canvas = within(canvasElement)

        userEvent.type(canvas.getByPlaceholderText('Digite o seu e-mail'), 'emailValido@email.com')
        userEvent.type(canvas.getByPlaceholderText('*******'), '12345')

        userEvent.click(canvas.getByRole('button'))

        await waitFor(() => {
            return expect(canvas.getByText('Login realizado!')).toBeInTheDocument()
        })

    }
}
