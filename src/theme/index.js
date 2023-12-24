import { extendTheme } from "@chakra-ui/react";
import { mode } from "@chakra-ui/theme-tools";



const styles ={
    global:props => ({
        body:{
            color:mode("gary.600","whiteAlpha.900")(props),
            bg:mode("garu.100","#141214")(props)
        }
    })
}

export const theme = extendTheme({
    styles
})