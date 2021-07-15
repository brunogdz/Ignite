import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { 
    Alert, 
    Keyboard, 
    Modal, 
    TouchableWithoutFeedback 
    } from 'react-native';
import { Button } from '../../components/Form/Button';
import { CategorySelectButton } from '../../components/Form/CategorySelectButton';
import { InputForm } from '../../components/Form/InputForm';
import { TransactionTypeButton } from '../../components/Form/TransactionTypeButton';
import { CategorySelect } from '../CategorySelect';
import { 
    Container, 
    Fields, 
    Form, 
    Header, 
    Title, 
    TypeTransactionContainer 
} from './styles';

interface FormData {
    name: string;
    amount: number;    
}

const schema = Yup.object().shape({
    name: Yup
        .string()
        .required('O nome da transação é obrigatório'),
    amount: Yup
        .number()
        .typeError('O valor da transação deve ser numérico!')
        .required('O valor da transação é obrigatório')
});

export function Register(){
    const [transactionType, settransactionType] = useState(''); 
    const [categoryModal, setCategoryModal] = useState(false);
    const [category, setCategory] = useState({
        key: 'category',
        name: 'Categoria',
    });
    const {
        control,
        handleSubmit,
        formState: { errors }
    } = useForm({
        resolver: yupResolver(schema)
    });

    function handleSelectTransactionType(type: 'up' | 'down') {
        settransactionType(type);
    }

    function handleCategoryModalOpen() {
        setCategoryModal(true);
    }
    
    function handleCategoryModalClose(){
        setCategoryModal(false);
    }

    function handleSubmitForm(form: FormData){
        if (!transactionType) {
           return Alert.alert('Por favor, selecione o tipo de transação.')
        }
        if (category.key === 'category') {     
            return Alert.alert('Por favor, selecione o tipo de categoria.')
        }

        const data = {
            name: form.name,
            amount: form.amount,
            category: category.key,
            transactionType,
        }

        console.log('Formulário Padrão: ', data);
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>            
                <Header>
                    <Title>Cadastro</Title>
                </Header>
                
                <Form> 
                    <Fields> 
                        <InputForm 
                            name="name"
                            control={control}
                            placeholder="Nome"
                            autoCapitalize="sentences"
                            autoCorrect={false} 
                            autoFocus={true}
                            returnKeyType="next"   
                            error={errors.name && errors.name.message}                     
                            />
                        <InputForm
                            name="amount"
                            control={control}
                            placeholder="Preço" 
                            autoCapitalize="none"
                            autoCorrect={false} 
                            keyboardType="numeric"
                            returnKeyType="next"
                            error={errors.amount && errors.amount.message}                     

                            />

                        <TypeTransactionContainer> 
                            <TransactionTypeButton 
                                type="up" 
                                text="income"
                                onPress={() => handleSelectTransactionType('up')}    
                                isActive={transactionType === 'up'}
                                />
                            <TransactionTypeButton 
                                type="down" 
                                text="outcome"
                                onPress={() => handleSelectTransactionType('down')}    
                                isActive={transactionType === 'down'}
                                />
                        </TypeTransactionContainer>

                        <CategorySelectButton  
                            text={category.name}
                            onPress={handleCategoryModalOpen}
                            />

                    </Fields>

                    <Button text="Enviar"
                        onPress={handleSubmit(handleSubmitForm)}
                        />
                </Form>

                <Modal visible={categoryModal}>
                    <CategorySelect
                        category={category}
                        setCategory={setCategory}
                        closeSelectCategory={handleCategoryModalClose} 
                        />
                </Modal>
            </Container>
        </TouchableWithoutFeedback>
    )
        
}