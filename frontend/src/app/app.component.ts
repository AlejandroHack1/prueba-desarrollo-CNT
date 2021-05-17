import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Registro', url: '/folder/Registro', icon: 'person-add' },
    { title: 'Pacientes Mayor Riesgo', url: '/folder/Listar_Pacientes_Mayor_Riesgo', icon: 'heart' },
    { title: 'Atender Paciente', url: '/folder/Atender_Paciente', icon: 'medkit' },
    { title: 'liberar Consultas', url: '/folder/Liberar_Consultas', icon: 'fitness' },
    { title: 'Listar Pacientes Fumadores Urgentes', url: '/folder/Listar_Pacientes_Fumadores_Urgentes', icon: 'pulse' },
    { title: 'Consulta mas Pacientes Atendidos', url: '/folder/Consulta_mas_Pacientes_Atendidos', icon: 'checkmark-circle' },
    { title: 'Paciente Mas Anciano', url: '/folder/Paciente_Mas_Anciano', icon: 'man' },
    { title: 'Optimizar Atención', url: '/folder/Optimizar_Atención', icon: 'rocket' },


  ];
  constructor() {}
}
