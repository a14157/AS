# AS
Arquitetura de sistemas

# Funcionalidades

i) o serviço de integração com dispositivos IoT, com Node-Red, por exemplo, no sentido de simular o comportamento do veículo; 
ii) o serviço para identificação do género e idade da pessoa, recorrendo à deteção de faces, onde frameworks como Keras, Tensorflow e Flask podem ser exploradas; ou mesmo 
iii) o serviço que possibilite o cálculo do caminho mais curto e respetiva distância entre dois pontos (origem/destino), onde tecnologia como o PostGIS e GeoServer poderão ser adequadas. De forma a testar os vários serviços, poderá ser explorada a plataforma Postman, devendo para isso ser preparado e disponibilizado um conjunto adequado de testes (sugere-se a preparação e exportação de uma collection do Postman).

i) as várias tipologias de veículos devem dispor de preçários diferentes; - Check
ii) para utilizar um determinado veículo, o cliente tem de dispor de saldo suficiente, estando previsto o seu carregamento; 
iii) deverá ser definido um critério de cálculo do período de utilização (por distância do percurso que pretende realizar, por tempo, outro) - check 

Devem estar previstos pelo menos dois tipos de perfis de utilizador:
a) Utilizador com perfil de cliente – dispõe de registo na solução
b) Utilizador com perfil de gestor – responsabilidade de gestão de operação

Os perfis devem permitir as seguintes funcionalidades: 
a) Utilizador com perfil de cliente
    - registo: Pretende-se que no registo de utilizador sejam validados o seu género e a sua idade, tendo em conta que o utilizador só pode utilizar os veículos se tiver idade igual, ou superior, a 16 anos.
    - Informação dos veículos: envia um pedido ao servidor e apresenta ao utilizador todos os veículos livres na sua área de localização (Ex: 1km).
        Para cada veículo deverá ser apresentada: a sua localização utilizando o sistema de coordenadas geográficas decimal (longitude e latitude), o tipo de veículo e a carga atual (capacidade a 55% restam 35km).
        De forma a organizar os veículos pode ser guardada a informação acerca dos locais de estacionamento dedicados.
    - Registo e autenticação: pedidos relacionados com a autenticação do utilizador para registar os dados de cliente, e efetuar a autenticação (login) de forma a tirar partido das funcionalidades dos clientes. - check
    - As minhas viagens, dados com as viagens (início, fim, data, duração, etc...)
    - O meu perfil (dados de utilizador, etc...) - check
    - Pesquisa de tipo de veículos: podendo detalhar o veículo, o raio de procura.
    (Poderá ser interessante permitir a pesquisa na zona circundante ou em ruas
    adjacentes). Informar o utilizador da distância pelo caminho mais curto.
    - Preçário: consulta dos detalhes dos preços praticados para um determinado tipo - check
de veículo.
    - Aluguer do veículo elétrico:
        - Iniciar uma viagem:O sistema deverá registar a hora de início e, decorrendo do preçário, deverá debitar cada período de utilização ao saldo do cliente. Finalizar uma viagem: efectuar o checkout através do QR Code. Saldo esgotado: Caso o cliente fique sem saldo, durante uma viagem, o veículo deve alertar o cliente e parar automaticamente ao fim de um minuto, de forma a garantir que o processo de estacionamento é feito em segurança.
        - Registar a hora do fim do aluguer, verificar a posição GPS atual do veículo.

b) Utilizador com perfil de gestor - Este utilizador deve ter a possibilidade de obter dados acerca da situação atual dos veículos e do resumo do histórico de utilização. Deve também permitir:
    - Configuração das entidades envolvidas: Tipos de veículos e veículos; - check
    - Definição dos preçários. - check


# TODO
- Adicionar Tokens em cada Route (apiTokens.json)



## Done
Utilizador com perfil de gestor:
- Configuração das entidades envolvidas: Tipos de veículos e veículos; - Check
- Definição dos preçários. - Check
- i) as várias tipologias de veículos devem dispor de preçários diferentes; - TypeOfVehicle Entity
- O meu perfil (dados de utilizador, etc...)
- iii) deverá ser definido um critério de cálculo do período de utilização (por distância do percurso que pretende realizar, por tempo, outro) - check  -  O meu criterio é duracao x preço por minuto do automovel 
- Registo e autenticação: pedidos relacionados com a autenticação do utilizador para registar os dados de cliente, e efetuar a autenticação (login) de forma a tirar partido das funcionalidades dos clientes - 
- Preçário: consulta dos detalhes dos preços praticados para um determinado tipo
