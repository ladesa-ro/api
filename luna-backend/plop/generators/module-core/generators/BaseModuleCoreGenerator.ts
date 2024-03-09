import { ProxifiedModule, generateCode, parseModule } from 'magicast';
import { Promisable } from 'type-fest';
import { addImportMember } from '../../../helpers/ts-ast/ts-ast';

export class BaseModuleCoreGenerator {
  protected modifyModuleQueue: ((mod: ProxifiedModule<any>) => Promisable<void>)[] = [];

  addModify(callback: (mod: ProxifiedModule<any>) => Promisable<void>) {
    this.modifyModuleQueue.push(callback);
  }

  addImportMember(path: string | null, member: string) {
    if (path) {
      this.addModify((mod) => addImportMember(mod, path, member));
    }
  }

  get isDirty() {
    return this.modifyModuleQueue.length > 0;
  }

  async transform(fileModuleContent: string) {
    const mod = parseModule(fileModuleContent);

    for (const modifyModule of this.modifyModuleQueue) {
      await modifyModule(mod);
    }

    return generateCode(mod).code;
  }
}
