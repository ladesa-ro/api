import { ProxifiedModule, generateCode, parseModule } from 'magicast';
import { Promisable } from 'type-fest';
import { addExportAllFrom, addImportMember } from '../../../helpers/ts-ast/ts-ast';

export class BaseModuleCoreGenerator {
  protected modifyModuleQueue: ((mod: ProxifiedModule<any>) => Promisable<void>)[] = [];

  get isDirty() {
    return this.modifyModuleQueue.length > 0;
  }
  
  addModify(callback: (mod: ProxifiedModule<any>) => Promisable<void>) {
    this.modifyModuleQueue.push(callback);
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
    const mod = parseModule(fileModuleContent);

    for (const modifyModule of this.modifyModuleQueue) {
      await modifyModule(mod);
    }

    return generateCode(mod).code;
  }
}
