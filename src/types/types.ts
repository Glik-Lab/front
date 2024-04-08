export interface DadosVenda {
  vendedor: string;
  cpf: string;
  cidade: string;
  endereco: string;
  comprador: string;
  rg: string;
  cpfc: string;
  enderecoC: string;
  cidadeC: string;
  cep: string;
  valorT: number;
  primeiraP: number;
  valorP: number;
  quantidadeP: number;
  parcelasI: number;
  numeroPi: number;
  parcelasCom: number;
  nomeTest1: string;
  cpfTest1: string;
  nomeTest2: string;
  cpfTest2: string;
}

export interface Venda {
  setVendedor(vendedor: string): void;
  setCpf(cpf: string): void;
  setCidade(cidade: string): void;
  setEndereco(endereco: string): void;
  setComprador(comprador: string): void;
  setRg(rg: string): void;
  setCpfc(cpfc: string): void;
  setEnderecoC(enderecoC: string): void;
  setCidadeC(cidadeC: string): void;
  setCep(cep: string): void;
  setValorT(valorT: number): void;
  setPrimeiraP(primeiraP: number): void;
  setValorP(valorP: number): void;
  setQuantidadeP(quantidadeP: number): void;
  setParcelasI(parcelasI: number): void;
  setNumeroPi(numeroPi: number): void;
  setParcelasCom(parcelasCom: number): void;
  setNomeTest1(nomeTest1: string): void;
  setCpfTest1(cpfTest1: string): void;
  setNomeTest2(nomeTest2: string): void;
  setCpfTest2(cpfTest2: string): void;
  getDadosVenda(): DadosVenda;
}
