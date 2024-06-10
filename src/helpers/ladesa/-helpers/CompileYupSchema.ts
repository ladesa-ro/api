import { BuildTypeObject } from '@unispec/ast-builder';
import {
  IUniNode,
  IUniNodeNull,
  IUniNodeOperation,
  IUniNodeType,
  IUniNodeTypeArray,
  IUniNodeTypeBoolean,
  IUniNodeTypeFile,
  IUniNodeTypeInteger,
  IUniNodeTypeObject,
  IUniNodeTypeString,
  IUniNodeView,
} from '@unispec/ast-types';
import { CompileNode } from '@unispec/ast-utils';
import * as yup from 'yup';

export class CompileYupSchema extends CompileNode {
  protected HandleGenericTypePostSchema(node: IUniNodeType, _context: any, schema: yup.AnySchema<any, any, any, any>) {
    let schemaCursor = schema;

    if (node.nullable) {
      schemaCursor = schemaCursor.nullable();
    } else {
      schemaCursor = schemaCursor.nonNullable().required();
    }

    if (node.required) {
      schemaCursor = schemaCursor.defined();
    } else {
      schemaCursor = schemaCursor.optional().default(() => undefined);
    }

    return schemaCursor;
  }

  protected HandleTypeBoolean(node: IUniNodeTypeBoolean, context?: any) {
    return this.HandleGenericTypePostSchema(node, context, yup.bool());
  }

  protected HandleTypeInteger(node: IUniNodeTypeInteger, context?: any) {
    let schemaCursor = yup.number();

    const constraints = node.constraints;

    if (constraints) {
      if (typeof constraints.min === 'number') {
        schemaCursor = schemaCursor.min(constraints.min);
      }

      if (typeof constraints.max === 'number') {
        schemaCursor = schemaCursor.max(constraints.max);
      }

      if (typeof constraints.positive === 'boolean') {
        schemaCursor = constraints.positive ? schemaCursor.positive() : schemaCursor.negative();
      }

      if (typeof constraints.integer === 'boolean' && constraints.integer) {
        schemaCursor = schemaCursor.integer();
      }
    }

    return this.HandleGenericTypePostSchema(node, context, schemaCursor);
  }

  protected HandleTypeString(node: IUniNodeTypeString, context?: any) {
    let schemaCursor = yup.string();

    const format = node.format;

    if (format) {
      switch (format) {
        case 'e-mail': {
          schemaCursor = schemaCursor.email();
          break;
        }

        case 'uuid': {
          schemaCursor = schemaCursor.uuid();
          break;
        }

        case 'date-time': {
          schemaCursor = schemaCursor.datetime();
          break;
        }

        default:
        case 'date':
        case 'time': {
          console.warn(`[CompileYupSchema#HandleTypeString] not implemented format support: ${format}.`);
          break;
        }
      }
    }

    const constraints = node.constraints;

    if (constraints) {
      const minLength = constraints.minLength;

      if (typeof minLength === 'number') {
        schemaCursor = schemaCursor.min(minLength);
      }

      const maxLength = constraints.maxLength;

      if (typeof maxLength === 'number') {
        schemaCursor = schemaCursor.max(maxLength);
      }

      const pattern = constraints.pattern;

      if (typeof pattern === 'string') {
        schemaCursor = schemaCursor.matches(new RegExp(pattern));
      }
    }

    return this.HandleGenericTypePostSchema(node, context, schemaCursor);
  }

  protected HandleTypeArray(node: IUniNodeTypeArray, context?: any) {
    let schemaCursor: yup.ArraySchema<any, any, any, any> = yup.array();

    schemaCursor = schemaCursor.of(this.Handle(node.items, context));

    return this.HandleGenericTypePostSchema(node, context, schemaCursor);
  }

  protected HandleTypeObject(node: IUniNodeTypeObject, context?: any) {
    let schemaCursor: yup.ObjectSchema<any, any, any, any> = yup.object();

    const properties = node.properties;

    if (properties) {
      for (const [key, node] of Object.entries(properties)) {
        schemaCursor = schemaCursor.shape({
          [key]: this.Handle(node, context),
        });
      }
    }

    return this.HandleGenericTypePostSchema(node, context, schemaCursor);
  }

  protected HandleView(node: IUniNodeView, context?: any) {
    return this.Handle(node.type, context);
  }

  protected HandleNull(_node: IUniNodeNull, _context?: any) {
    return yup.mixed().transform(() => null);
  }
  HandleTypeReference(node: IUniNodeType, context?: any) {
    const realTarget = this.repository.GetRealTargetStrict(node);

    return this.HandleGenericTypePostSchema(node, context, this.Handle(realTarget, context));
  }

  protected HandleTypeFile(_node: IUniNodeTypeFile, _context?: any) {
    return yup.mixed();
  }

  protected HandleNever() {
    return yup
      .mixed()
      .transform(() => null)
      .strip();
  }

  protected HandleOperation(node: IUniNodeOperation, context?: any) {
    const input = node.input;

    if (input) {
      const body = input.body;
      const params = input.params;
      const queries = input.queries;

      let combinedInputSchema = yup.object();

      if (body) {
        const bodyRealTarget = this.repository.GetRealTargetStrict(body);

        combinedInputSchema = combinedInputSchema.shape({
          body: this.Handle(bodyRealTarget, context),
        });
      }

      if (params) {
        combinedInputSchema = combinedInputSchema.shape({
          params: this.HandleTypeObject(BuildTypeObject({ properties: params })),
        });
      }

      if (queries) {
        combinedInputSchema = combinedInputSchema.shape({
          queries: this.HandleTypeObject(BuildTypeObject({ properties: queries })),
        });
      }

      return combinedInputSchema;
    }

    return this.HandleNever();
  }

  Handle(node: IUniNode, context?: any): yup.AnySchema<any, any, any, any> {
    const schema = super.Handle(node, context);

    if (!schema) {
      return this.HandleNever();
    }

    return schema;
  }
}
