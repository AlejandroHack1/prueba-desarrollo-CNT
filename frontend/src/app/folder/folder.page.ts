import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AuthService } from '../auth.service';

export interface Config {
  pacientes: string;
}

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;
  authForm: FormGroup;
  submitted: boolean;

  @ViewChild('edad', { static: false }) edad: any;
  @ViewChild('username', { static: false }) nombre: any;
  @ViewChild('historiaClinica', { static: false }) historiaClinica: any;
  @ViewChild('option', { static: false }) option: any;
  @ViewChild('anosFumando', { static: false }) anosFumando: any;
  @ViewChild('pesoEstatura', { static: false }) pesoEstatura: any;
  @ViewChild('tieneDieta', { static: false }) tieneDieta: any;

  @ViewChild('numeroHistoriaClinica', { static: false })
  numeroHistoriaClinica: any;

  //Defines an object allowing the interface properties to be accessed
  public config: Config;

  //Defines an object for storing the column definitions of the datatable

  public columns: any;
  //Defines an object for storing returned data to be displayed in the template

  public rows: any;

  show: boolean = false;
  verificarEdad: number;
  value: number;
  valueFuma: string;
  valueEdad: number;
  fumador: any;
  anosFumador: any;
  dieta: any;
  relacionPesoEstatura: number;
  prioridad: number;
  riesgo: number;
  items: any;
  p: number;
  showList: boolean;
  searchTerm: any;
  itemConsulta: any;
  itemPrioridadConsulta: any;
  listPriority: any;
  urgencias: any;
  pediatria: any;
  general: any;
  itemsConsulta: any;
  urgenciasConsulta: any;
  pediatriaConulta: any;
  generalConsulta: any;
  fumadores: any;
  generalConsultaMasAtencion: any;
  max: any;
  optimizacion: any;

  constructor(
    private activatedRoute: ActivatedRoute,
    public formBuilder: FormBuilder,
    public loading: LoadingController,
    public ServiceProvider: AuthService,
    public alertCtrl: AlertController,
    public router: Router
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
    this.buildForm();
    this.setUserValidators();
    this.getPacientes();
    this.getConsulta();
  }

  public sortByKey(array, key) {
    return array.sort(function (a, b) {
      var x = a[key];
      var y = b[key];
      return x > y ? -1 : x < y ? 0 : 1;
    });
  }

  async getPacientes() {
    this.ServiceProvider.getData().subscribe((data) => {
      this.items = data[0]['pacientes'];
      this.listPriority = this.sortByKey(this.items, 'prioridad');

      this.urgencias = this.items.filter(
        (item) => item.prioridad * 1 > 4 && item.enAtencion != 1
      );
      this.pediatria = this.items.filter(
        (item) => item.edad <= 15 && item.prioridad <= 4 && item.enAtencion != 1
      );
      this.general = this.items.filter(
        (item) => item.edad >= 16 && item.prioridad <= 4 && item.enAtencion != 1
      );

      this.optimizacion = (this.urgencias, this.pediatria, this.general);
      console.log(this.optimizacion);

      this.fumadores = this.items.filter((item) => item.fumador == 1);

      //obtener el paciente de mayor edad
      this.max = this.items.filter((item) => item.row == 0);
    });
  }

  //Obtener consultas
  async getConsulta() {
    this.ServiceProvider.getData().subscribe((data) => {
      this.itemsConsulta = data[1]['consulta'];

      this.urgenciasConsulta = this.itemsConsulta.filter(
        (item) => item.tipoConsulta == 2
      );
      this.pediatriaConulta = this.itemsConsulta.filter(
        (item) => item.tipoConsulta == 1
      );
      this.generalConsulta = this.itemsConsulta.filter(
        (item) => item.tipoConsulta == 3
      );

      //obtiene la consulta que mas ha atendido hasta el momento
      this.generalConsultaMasAtencion = this.itemsConsulta.filter(
        (item) => item.row == 0
      );
    });
  }

  /*Listar_Pacientes_Mayor_Riesgo*/

  async list() {
    let loader = await this.loading.create({
      message: 'Listando pacientes por favor espera...',
    });

    await loader.present().then(() => {
      this.itemConsulta = this.items.filter(
        (item) => item.noHistoriaClinica === this.numeroHistoriaClinica.value
      );

      console.log(this.itemConsulta);
      if (this.itemConsulta.length != 0) {
        this.itemPrioridadConsulta = this.itemConsulta[0].prioridad;

        this.rows = this.items.filter(
          (item) => item.prioridad * 1 > this.itemPrioridadConsulta * 1
        );

        this.showList = true;
      } else {
        this.showList = false;
      }

      loader.dismiss();
    });
  }

  onChange(valueEdad) {
    this.verificarEdad = valueEdad;
  }

  onChangeFuma() {
    if (this.valueFuma == '0') {
      this.value = 0;
    } else if (this.valueFuma == '1') {
      this.value = 1;
    }
  }

  buildForm() {
    this.authForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern('[a-zA-Z ]*')]],
      historiaClinica: ['', [Validators.required]],
      edad: ['', [Validators.required]],
      pesoEstatura: ['', [Validators.required]],
      option: ['', [Validators.required]],
      anosFumando: ['', [Validators.required]],
      tieneDieta: ['', [Validators.required]],
    });
  }

  setUserValidators() {
    const anosFumandoControl = this.authForm.get('anosFumando');
    const optionControl = this.authForm.get('option');
    const pesoEstaturaControl = this.authForm.get('pesoEstatura');
    const tieneDietaControl = this.authForm.get('tieneDieta');

    this.authForm.get('edad').valueChanges.subscribe((edadValue) => {
      if (edadValue <= 15 && edadValue >= 1) {
        pesoEstaturaControl.setValidators([Validators.required]);
      } else {
        pesoEstaturaControl.setValue('');
        pesoEstaturaControl.setValidators(null);
      }

      pesoEstaturaControl.updateValueAndValidity();

      if (edadValue <= 40 && edadValue >= 16) {
        optionControl.setValidators([Validators.required]);
      } else {
        optionControl.setValue('');
        optionControl.setValidators(null);
      }

      optionControl.updateValueAndValidity();

      if (edadValue >= 41) {
        tieneDietaControl.setValidators([Validators.required]);
      } else {
        tieneDietaControl.setValue('');
        tieneDietaControl.setValidators(null);
      }

      tieneDietaControl.updateValueAndValidity();
    });

    this.authForm.get('option').valueChanges.subscribe((userOption) => {
      if (userOption === '0') {
        anosFumandoControl.setValue('');
        anosFumandoControl.setValidators(null);
      }

      if (userOption === '1') {
        anosFumandoControl.setValidators([Validators.required]);
      }

      anosFumandoControl.updateValueAndValidity();
    });
  }

  get errorControl() {
    return this.authForm.controls;
  }

  async Register() {
    this.submitted = true;

    if (!this.authForm.valid) {
      console.log('Por favor completa todos los datos!');
      return false;
    } else {
      console.log(this.tieneDieta);

      /*    Para los jóvenes:
Si es fumador: Años de fumador/4 + 2
En cualquier otro caso: 2
*/

      if (this.anosFumando) {
        this.anosFumador = this.anosFumando.value;
      }

      if (this.option) {
        this.fumador = this.option.value;

        if (this.fumador == 1) {
          this.prioridad = (this.anosFumador * 1) / 4 + 2;
        } else {
          this.prioridad = 2;
        }
      }

      /*    Para los ancianos:
Si tiene dieta y está entre 60 y 100 años: Edad/20 + 4
Sí no: Edad/30 + 3
*/

      if (this.tieneDieta) {
        this.dieta = this.tieneDieta.value;

        if (this.dieta == 1 && this.valueEdad >= 60 && this.valueEdad <= 100) {
          this.prioridad = (this.valueEdad * 1) / 20 + 4;
        } else {
          this.prioridad = (this.valueEdad * 1) / 30 + 3;
        }
      }

      if (this.pesoEstatura) {
        this.relacionPesoEstatura = this.pesoEstatura.value;

        /*
      Para los niños:
(1-5 años): Peso-estatura + 3
(6-12 años): Peso-estatura + 2
(13-15 años): Peso-estatura + 1
*/

        if (this.valueEdad >= 1 && this.valueEdad <= 5) {
          this.prioridad = this.relacionPesoEstatura * 1 + 3;
        } else if (this.valueEdad >= 6 && this.valueEdad <= 12) {
          this.prioridad = this.relacionPesoEstatura * 1 + 2;
        } else {
          this.prioridad = this.relacionPesoEstatura * 1 + 1;
        }
      }

      /*
    Además, se sabe que cada paciente tiene un riesgo que se determina por:  (Edad * prioridad) / 100.
Y en el caso de los ancianos:
(Edad * prioridad)/100 + 5.3
*/
      if (this.tieneDieta) {
        this.riesgo = (this.valueEdad * this.prioridad) / 100 + 5.3;
      } else {
        this.riesgo = (this.valueEdad * this.prioridad) / 100;
      }

      let data = {
        fumador: this.fumador,
        nombre: this.nombre.value,
        anosFumando: this.anosFumador,
        historiaClinica: this.historiaClinica.value,
        tieneDieta: this.dieta,
        relacionPesoEstatura: this.relacionPesoEstatura,
        edad: this.edad.value,
        prioridad: this.prioridad,
        riesgo: this.riesgo,
      };

      console.log(data);
      let loader = await this.loading.create({
        message: 'Procesando por favor espere…',
      });

      await loader.present().then(() => {
        this.ServiceProvider.register(data).subscribe(
          async (response) => {
            console.log(response);
            await loader.dismiss();

            this.authForm.reset();

            let alert = await this.alertCtrl.create({
              header: 'Registro Éxitoso',
              subHeader: response,
              buttons: ['OK'],
            });

            await alert.present();
            this.router.navigateByUrl('/folder/Registro');
          },

          async (err) => {
            console.log(err);
            loader.dismiss();

            let alert = await this.alertCtrl.create({
              header: 'ERROR',
              subHeader: 'No se pudo hacer el registro',
              buttons: ['OK'],
            });

            await alert.present();
          }
        );
      });
    }
  }

  Listassign() {
    this.show = true;
  }

  async assign(paciente, dato) {
    let loader = await this.loading.create({
      message: 'Procesando por favor espere…',
    });

    var id = paciente.id_paciente;

    if (dato == 2) {
      if (this.urgenciasConsulta[0].estado == 1) {
        let alert = await this.alertCtrl.create({
          header:
            'Favor espera tu turno, en estos momentos hay Atención en URGENCIAS',
          subHeader: 'Gracias',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
    }

    if (dato == 1) {
      if (this.pediatriaConulta[0].estado == 1) {
        let alert = await this.alertCtrl.create({
          header:
            'Favor espera tu turno, en estos momentos hay Atención en PEDIATRIA',
          subHeader: 'Gracias',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
    }

    if (dato == 3) {
      if (this.generalConsulta[0].estado == 1) {
        let alert = await this.alertCtrl.create({
          header:
            'Favor espera tu turno, en estos momentos hay Atención en MEDICINA INTEGRAL',
          subHeader: 'Gracias',
          buttons: ['OK'],
        });
        await alert.present();
        return;
      }
    }

    let data = {
      idpaciente: id,
      tipoconsulta: dato,
    };

    await loader.present().then(() => {
      this.ServiceProvider.assign(data).subscribe(
        async (response) => {
          await loader.dismiss();

          let alert = await this.alertCtrl.create({
            header: 'Paciente en Atención',
            subHeader: response,
            buttons: ['OK'],
          });

          await alert.present();
          this.ngOnInit();
        },

        async (err) => {
          console.log(err);
          loader.dismiss();

          let alert = await this.alertCtrl.create({
            header: 'ERROR',
            subHeader: 'No se pudo atender el paciente',
            buttons: ['OK'],
          });

          await alert.present();
        }
      );
    });
  }

  async Liberar() {
    let loader = await this.loading.create({
      message: 'Procesando por favor espere…',
    });

    await loader.present().then(() => {
      this.ServiceProvider.liberar().subscribe(
        async (response) => {
          await loader.dismiss();

          let alert = await this.alertCtrl.create({
            header: 'Consultas Liberadas',
            subHeader: response,
            buttons: ['OK'],
          });

          await alert.present();
          this.ngOnInit();
        },

        async (err) => {
          console.log(err);
          loader.dismiss();

          let alert = await this.alertCtrl.create({
            header: 'ERROR',
            subHeader: 'No se pudo Liberar Consultas',
            buttons: ['OK'],
          });

          await alert.present();
        }
      );
    });
  }
}
