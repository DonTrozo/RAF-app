export type ValidationResult = {
  valid: boolean;
  errors: string[];
};

export function validateSouthAfricanId(idNumber: string): ValidationResult {
  const cleaned = idNumber.replace(/\D/g, '');
  const errors: string[] = [];

  if (cleaned.length !== 13) {
    errors.push('South African ID number must contain 13 digits.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateClaimReference(reference: string): ValidationResult {
  const errors: string[] = [];
  const trimmed = reference.trim().toUpperCase();

  if (!trimmed) {
    errors.push('Claim reference is required.');
  }

  if (trimmed && !/^RAF-[0-9]{4}-[0-9]{6}$/.test(trimmed)) {
    errors.push('Claim reference must use the format RAF-2026-000000.');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export function validateRequired(value: string, fieldName: string): ValidationResult {
  const errors = value.trim() ? [] : [`${fieldName} is required.`];

  return {
    valid: errors.length === 0,
    errors
  };
}
