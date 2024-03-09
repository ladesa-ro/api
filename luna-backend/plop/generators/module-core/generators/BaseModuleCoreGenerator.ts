import { ProxifiedModule, generateCode, parseModule } from 'magicast';
import { Promisable } from 'type-fest';
import { addExportAllFrom, addImportMember } from '../../../helpers/ts-ast/ts-ast';

type IModifyModuleMod = (mod: ProxifiedModule<any>, code: string) => Promisable<void>;

type IModifyModuleHandleMod = {
  kind: 'mod';
  fn: IModifyModuleMod;
};

type IModifyModuleCode = (mod: ProxifiedModule<any>, code: string) => Promisable<string>;

type IModifyModuleHandleCode = {
  kind: 'code';
  fn: IModifyModuleCode;
};

type IModifyModuleHandle = IModifyModuleHandleMod | IModifyModuleHandleCode;

export class BaseModuleCoreGenerator {
  protected modifyModuleQueue: IModifyModuleHandle[] = [];

  get isDirty() {
    return this.modifyModuleQueue.length > 0;
  }

  addModify(callback: IModifyModuleMod) {
    this.modifyModuleQueue.push({ kind: 'mod', fn: callback });
    return this;
  }

  addModifyCode(callback: IModifyModuleCode) {
    this.modifyModuleQueue.push({ kind: 'code', fn: callback });
    return this;
  }

  addImportMember(path: string | null, member: string) {
    if (path) {
      this.addModify((mod) => addImportMember(mod, path, member));
    }
    return this;
  }

  addExportAllFrom(path: string) {
    this.addModify((mod) => addExportAllFrom(mod, path));
    return this;
  }

  async transform(fileModuleContent: string) {
    let code = fileModuleContent;

    for (const modifyModule of this.modifyModuleQueue) {
      const mod = parseModule(code);

      if (modifyModule.kind === 'code') {
        code = await modifyModule.fn(mod, code);
      } else if (modifyModule.kind === 'mod') {
        await modifyModule.fn(mod, code);
        code = generateCode(mod).code;
      }
    }

    return code;
  }
}
