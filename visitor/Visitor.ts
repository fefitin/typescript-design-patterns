interface AcceptsVisitor {
  accept(visitor: Visitor): void;
}

class ElementA implements AcceptsVisitor {
  accept(visitor: Visitor) {
    visitor.visitElementA(this);
  }
}

class ElementB implements AcceptsVisitor {
  accept(visitor: Visitor) {
    visitor.visitElementB(this);
  }
}

interface Visitor {
  visitElementA(node: ElementA): void;
  visitElementB(node: ElementB): void;
}

class VisitorElementA implements Visitor {
  visitElementA(node: ElementA) {
    console.log('Visitor A: visitElementA');
  }
  visitElementB(node: ElementB) {
    console.log('Visitor A: visitElementB');
  }
}

class VisitorElementB implements Visitor {
  visitElementA(node: ElementA) {
    console.log('Visitor B: visitElementA');
  }
  visitElementB(node: ElementB) {
    console.log('Visitor B: visitElementB');
  }
}

const elements = [new ElementA(), new ElementB(), new ElementA()];
elements.forEach(element => element.accept(new VisitorElementA()));
elements.forEach(element => element.accept(new VisitorElementB()));
