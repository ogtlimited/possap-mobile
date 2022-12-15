import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'nextApprovalLevel',
})
export class NextApprovalLevelPipe implements PipeTransform {
  transform(value: unknown, ...args: any[]): unknown {
    const approvalWorkFlow = args[0];
    const filt = approvalWorkFlow.indexOf(value) + 1;
    return approvalWorkFlow[filt].length > 30 ?  approvalWorkFlow[filt].slice(0,30) + '...' : approvalWorkFlow[filt];
  }
}
