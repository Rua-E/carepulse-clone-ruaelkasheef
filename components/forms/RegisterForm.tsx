"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Form, FormControl } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { UserFormValidation } from "@/lib/validation";

import "react-phone-number-input/style.css";
import CustomFormField from "../CustomFormField";
import SubmitButton from "../SubmitButton";
import { FormFieldType } from "./PatientForm";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { Doctors, GenderOptions, IdentificationTypes } from "@/constants";
import { Label } from "@radix-ui/react-label";
import { SelectItem } from "../ui/select";
import Image from "next/image";

const RegisterForm = ({ user }: { user: User }) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof UserFormValidation>>({
    resolver: zodResolver(UserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  async function onSubmit({ name, email, phone }: z.infer<typeof UserFormValidation>) {
    setIsLoading(true);

    try {
      const userData = { name, email, phone };

      const user = await createUser(userData);

      if (user) router.push(`/patients/${user.$id}/register`)
    } catch (error) {
      console.log(error);
    }
    
    setIsLoading(false);
  };


  return (
    <Form {...form}>
    <form 
        onSubmit={form.handleSubmit(onSubmit)} 
        className="flex-1 space-y-12">

      <section className="space-y-4">
        <h1 className="header">Welcome ✋🏽 </h1>
        <p className="text-dark-700">Let us know more about yourself.</p>
      </section>

      <section className="space-y-6">
        <div className="mb-9 space-y-1">
            <h2 className="sub-header">Personal Information</h2>
        </div>
    </section>
{/* NAME */}
                <CustomFormField 
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    iconSrc="/assets/icons/user.svg"
                    iconAlt="user"
                    ></CustomFormField>

{/* EMAIL & PHONE */}
        <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="email"
                    label="Email"
                    placeholder="johndoe@gmail.com"
                    iconSrc="/assets/icons/email.svg"
                    iconAlt="email"
                    ></CustomFormField>

                <CustomFormField 
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="phone"
                    label="Phone number"
                    placeholder="(555) 555-5555"
                    ></CustomFormField>
        </div>

{/* BIRTHDATE & GENDER */}
        <div className="flex flex-col gap-6 xl:flex-row">
                <CustomFormField
                    fieldType={FormFieldType.DATE_PICKER}
                    control={form.control}
                    name="birthDate"
                    label="Date of Birth"
                    ></CustomFormField>

                <CustomFormField 
                    fieldType={FormFieldType.SKELETON}
                    control={form.control}
                    name="gender"
                    label="Gender"
                    renderSkeleton={(field) => (
                        <FormControl>
                            <RadioGroup className="flex h-11 gap-6 xl:justify-between"
                            onValueChange={field.onChange}
                            defaultValue={field.value}>
                               {GenderOptions.map((option) => (
                                   <div key={option} 
                                   className="radio-group">
                                     <RadioGroupItem value={option} id={option} >
                                         </RadioGroupItem>       
                                        <Label htmlFor={option}
                                            className="cursor-pointer">
                                            {option}
                                        </Label>
                                </div>
                               ))}
                            </RadioGroup>
                        </FormControl>
                    )}
                    ></CustomFormField>
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="address"
                    label="Address"
                    placeholder="14th Street, New York"
                    ></CustomFormField>

            <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="occupation"
                    label="Occupation"
                    placeholder="Software Engineer"
                    ></CustomFormField>
        </div>


        <div className="flex flex-col gap-6 xl:flex-row">
        <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="emergencyContactName"
                    label="Emergency contact name"
                    placeholder="Guardian's name"
                    ></CustomFormField>

                <CustomFormField 
                    fieldType={FormFieldType.PHONE_INPUT}
                    control={form.control}
                    name="emergencyContactNumber"
                    label="Emergency contact number"
                    placeholder="(555) 555-5555"
                    ></CustomFormField>
        </div>

      

          <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Medical Information</h2>
            </div>
        </section>

            <CustomFormField 
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="primaryPhysician"
                label="Primary Physician"
                placeholder="Select a physician"
            >
                {Doctors.map((doctor) => (
                    <SelectItem 
                        key={doctor.name}
                        value={doctor.name}
                        >
                        <div className="flex cursor-pointer items-center gap-2">
                            <Image 
                                src={doctor.image}
                                width={32}
                                height={32}
                                alt={doctor.name}
                                className="rounded-full border border-dark-500"
                                />
                            <p>
                                {doctor.name}
                            </p>

                        </div>

                    </SelectItem>
                ))}
            </CustomFormField>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="insuranceProvider"
                    label="Insurance provider"
                    placeholder="BlueCross BlueShield"
                    ></CustomFormField>

            <CustomFormField
                    fieldType={FormFieldType.INPUT}
                    control={form.control}
                    name="insurancePolicyNumber"
                    label="Insurance policy number"
                    placeholder="ABC123456789"
                    ></CustomFormField>     
        </div>
        
        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="allergies"
                    label="Allergies (if any)"
                    placeholder="Peanuts, Penicillin, Pollen"
                    ></CustomFormField>

            <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="currentMedication"
                    label="Current medication (if any)"
                    placeholder="Ibuprofen 200mg, Paracetamol 500mg"
                    ></CustomFormField>     
        </div>

        <div className="flex flex-col gap-6 xl:flex-row">
            <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="familyMedicalHistory"
                    label="Family medical history"
                    placeholder="Mother had brain cancer, Father had heart disease"
                    ></CustomFormField>

            <CustomFormField
                    fieldType={FormFieldType.TEXTAREA}
                    control={form.control}
                    name="pastMedicalHistory"
                    label="Past medical history"
                    placeholder="Appendectomy, Tonsillectomy"
                    ></CustomFormField>     
        </div>

        <section className="space-y-6">
            <div className="mb-9 space-y-1">
                <h2 className="sub-header">Identification and Verification.</h2>
            </div>
        </section>

        <CustomFormField 
                fieldType={FormFieldType.SELECT}
                control={form.control}
                name="identificationType"
                label="Identification Type"
                placeholder="Select an identification type"
            >
                {IdentificationTypes.map((type) => (
                    <SelectItem key={type} value={type}>
                           {type} 
                    </SelectItem>
                ))}
            </CustomFormField>

      <SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
    </form>
  </Form>
  );
}

export default RegisterForm;
