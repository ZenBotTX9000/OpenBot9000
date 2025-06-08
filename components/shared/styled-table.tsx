"use client";

export function StyledTable(props: any) {
  return (
    <div className="overflow-x-auto my-4 shape-chamfer border" style={{ borderColor: 'rgb(var(--color-grey-800) / 0.1)'}}>
      <table
        className="w-full text-left"
        {...props}
      />
    </div>
  );
}