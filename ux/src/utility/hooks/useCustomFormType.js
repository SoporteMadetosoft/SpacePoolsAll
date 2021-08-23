import Input from "react-select/src/components/Input";

export const useCustomFormType = (tipo) => {

    switch(tipo){
        case 'Input':
            return <Input />;
        
        default:
            return <Input />;
    }
}