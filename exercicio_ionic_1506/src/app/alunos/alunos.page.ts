
import { Component, OnInit } from '@angular/core';
import { AlunoService } from '../services/alunos/aluno.service';
import { NgForm } from '@angular/forms';
import { Aluno } from '../models/aluno';

@Component({
  selector: 'app-alunos',
  templateUrl: './alunos.page.html',
  styleUrls: ['./alunos.page.scss'],
})
export class AlunosPage implements OnInit {

  aluno = {} as Aluno;
  alunos: Aluno[];

  constructor(private alunoService: AlunoService) {}
  
  ngOnInit() {
    this.getAlunos();
  }

  // defini se um carro será criado ou atualizado
  saveAluno(form: NgForm) {
    if (this.aluno.id !== undefined) {
      this.alunoService.updateAluno(this.aluno).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.alunoService.saveAluno(this.aluno).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  // Chama o serviço para obtém todos os carros
  getAlunos() {
    this.alunoService.getAlunos().subscribe((aluno: Aluno[]) => {
      this.alunos = aluno;
    });
  }

  // deleta um carro
  deleteaAluno(aluno: Aluno) {
    this.alunoService.deleteAluno(aluno).subscribe(() => {
      this.getAlunos();
    });
  }

  // copia o carro para ser editado.
  editaAluno(aluno: Aluno) {
    this.aluno = { ...aluno };
  }

  // limpa o formulario
  cleanForm(form: NgForm) {
    this.getAlunos();
    form.resetForm();
    this.aluno = {} as Aluno;
  }

}