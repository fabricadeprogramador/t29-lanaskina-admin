<template>
  <div>
    <v-toolbar flat color="white">
      <v-toolbar-title>Relatórios</v-toolbar-title>
      <v-spacer></v-spacer>
    </v-toolbar>
    <v-form>
      <v-container fluid>
        <v-card>
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Total Clientes"
                value="200"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Clientes Ultimo Mês"
                value="67"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Gastos Mês"
                value="R$2.356,80"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Total Empresas"
                value="20"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Empresas Ultimo Mês"
                value="5"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Receita Mês"
                value="R$2.356,80"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-spacer></v-spacer>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Receita Anual"
                value="R$10.000,00"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        
          <v-row>
            <v-col class="d-flex" cols="12" sm="6">
              <v-select :items="items" label="Empresa" solo></v-select>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Total Transações"
                value="R$2000,00"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Total Lanaskina"
                value="67"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="3">
              <v-text-field
                label="Comissão por venda no Lanaskina"
                value="R$2.356,80"
                hint="For example, flowers or used cars"
                outlined
                readonly
              ></v-text-field>
            </v-col>
          </v-row>
        </v-card>
      </v-container>
    </v-form>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>